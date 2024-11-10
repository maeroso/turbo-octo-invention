import FluentSQLiteDriver
import Hummingbird
import HummingbirdFluent
import Logging

public protocol AppArguments {
    var hostname: String { get }
    var port: Int { get }
    var logLevel: Logger.Level? { get }
    var inMemoryTesting: Bool { get }
}

public func buildApplication(_ arguments: some AppArguments) async throws -> some ApplicationProtocol {
    let logger = {
        var logger = Logger(label: "UsersAPI")
        logger.logLevel =
            arguments.logLevel ?? Environment().get("LOG_LEVEL").flatMap { Logger.Level(rawValue: $0) } ?? .info
        return logger
    }()

    let fluent = Fluent(logger: logger)
    fluent.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    await fluent.migrations.add(CreateUserTableMigration())

    let router = buildRouter(inMemoryTesting: arguments.inMemoryTesting, fluent: fluent)
    var app = Application(
        router: router,
        configuration: .init(
            address: .hostname(arguments.hostname, port: arguments.port),
            serverName: "UsersAPI"
        ),
        logger: logger
    )
    app.addServices(fluent)
    app.beforeServerStarts {
        try await fluent.migrate()
    }
    return app
}
