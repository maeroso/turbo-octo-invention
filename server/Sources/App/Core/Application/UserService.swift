import Foundation

struct CreateUserCommand: Codable {
    let firstName: String
    let lastName: String
    let email: String
}

struct UserService {
    let repository: UserRepository

    func createUser(command: CreateUserCommand) async throws -> User {
        let user = User(id: UUID(), firstName: command.firstName, lastName: command.lastName, email: command.email)
        try await self.repository.save(user: user)
        return user
    }

    func getUser(by id: UUID) async throws -> User? {
        return try await self.repository.get(by: id)
    }
}
