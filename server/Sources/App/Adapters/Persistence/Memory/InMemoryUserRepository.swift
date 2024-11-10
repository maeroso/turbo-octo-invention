import Foundation

actor InMemoryUserRepository: UserRepository {
    private var users: [UUID: User]

    init() {
        users = [:]
    }

    func save(user: User) async throws {
        users[user.id] = user
    }

    func get(by id: UUID) async throws -> User? {
        return users[id]
    }
}
