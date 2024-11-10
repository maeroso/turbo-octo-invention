import Foundation

protocol UserRepository: Sendable {
    func get(by id: UUID) async throws -> User?
    func save(user: User) async throws
}
