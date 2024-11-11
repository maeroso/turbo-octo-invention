import FluentKit

struct CreateUserTableMigration: AsyncMigration {
    func prepare(on database: Database) async throws {
        return try await database.schema("users")
            .id()
            .field("first_name", .string, .required)
            .field("last_name", .string, .required)
            .field("email", .string, .required)
            .field("delivery_address", .string, .required)
            .field("preferred_time", .string, .required)
            .field("special_instructions", .string)
            .create()
    }

    func revert(on database: Database) async throws {
        return try await database.schema("users").delete()
    }
}
