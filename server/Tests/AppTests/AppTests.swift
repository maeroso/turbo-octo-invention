import Hummingbird
import HummingbirdTesting
import Logging
import XCTest

@testable import App

final class AppTests: XCTestCase {
    struct TestArguments: AppArguments {
        var hostname = "127.0.0.1"
        var port = 0
        var logLevel: Logger.Level? = .trace
        var inMemoryTesting = true
    }

    func testApp() async throws {
        let args = TestArguments()
        let app = try await buildApplication(args)
        try await app.test(.router) { client in
            try await client.execute(uri: "/health", method: .get) { response in
                XCTAssertEqual(response.status, .ok)
            }
        }
    }

    func testCreate() async throws {
        let args = TestArguments()
        let app = try await buildApplication(args)
        try await app.test(.router) { client in
            try await client.execute(
                uri: "/users", method: .post,
                body: ByteBuffer(string: #"{"firstName":"John","lastName":"Doe","email":"johndoe@example.com"}"#)
            ) { response in
                XCTAssertEqual(response.status, .created)
                let user = try JSONDecoder().decode(User.self, from: response.body)
                XCTAssertEqual(user.firstName, "John")
                XCTAssertEqual(user.lastName, "Doe")
                XCTAssertEqual(user.email, "johndoe@example.com")
            }
        }
    }

    func testCreateWithMissingField() async throws {
        let args = TestArguments()
        let app = try await buildApplication(args)
        try await app.test(.router) { client in
            try await client.execute(
                uri: "/users", method: .post, body: ByteBuffer(string: #"{"firstName":"John","lastName":"Doe"}"#)
            ) { response in
                XCTAssertEqual(response.status, .badRequest)
            }
        }
    }

    func testCreateThenGet() async throws {
        let args = TestArguments()
        let app = try await buildApplication(args)
        try await app.test(.router) { client in
            let responseForCreate = try await client.execute(uri: "/users", method: .post, body: ByteBuffer(string: #"{"firstName":"John","lastName":"Doe","email":"johndoe@example.com"}"#))
            XCTAssertEqual(responseForCreate.status, .created)
            let createdUser = try JSONDecoder().decode(User.self, from: responseForCreate.body)
            let responseForGet = try await client.execute(uri: "/users/\(createdUser.id)", method: .get)
            XCTAssertEqual(responseForGet.status, .ok)
            let retrievedUser = try JSONDecoder().decode(User.self, from: responseForGet.body)
            XCTAssertEqual(retrievedUser, createdUser)
        }
    }

    func testCreateThenGetWithFluent() async throws {
        let args = TestArguments(inMemoryTesting: false)
        let app = try await buildApplication(args)
        try await app.test(.router) { client in
            let responseForCreate = try await client.execute(uri: "/users", method: .post, body: ByteBuffer(string: #"{"firstName":"John","lastName":"Doe","email":"johndoe@example.com"}"#))
            XCTAssertEqual(responseForCreate.status, .created)
            let createdUser = try JSONDecoder().decode(User.self, from: responseForCreate.body)
            let responseForGet = try await client.execute(uri: "/users/\(createdUser.id)", method: .get)
            XCTAssertEqual(responseForGet.status, .ok)
            let retrievedUser = try JSONDecoder().decode(User.self, from: responseForGet.body)
            XCTAssertEqual(retrievedUser, createdUser)
        }
    }
}
