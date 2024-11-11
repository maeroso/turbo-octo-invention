import Foundation

struct CreateUserCommand: Codable {
    let firstName: String
    let lastName: String
    let email: String
    let deliveryAddress: String
    let preferredTime: String
    let specialInstructions: String?
}

struct UserService {
    let repository: UserRepository

    func createUser(command: CreateUserCommand) async throws -> User {
        let user = User(
            id: UUID(), firstName: command.firstName, lastName: command.lastName, email: command.email,
            deliveryAddress: command.deliveryAddress, preferredTime: command.preferredTime, specialInstructions: command.specialInstructions
        )
        try await self.repository.save(user: user)
        return user
    }

    func getUser(by id: UUID) async throws -> User? {
        return try await self.repository.get(by: id)
    }
}
