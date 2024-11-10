import FluentKit
import Foundation
import HummingbirdFluent

struct FluentUserRepository: UserRepository {
    let fluent: Fluent

    func get(by id: UUID) async throws -> User? {
      guard let user = try await FluentUser.find(id, on: fluent.db()) else {
        return nil
      }
      return User(id: user.id!, firstName: user.firstName, lastName: user.lastName, email: user.email)
    }

    func save(user: User) async throws {
        let newUser = FluentUser(id: user.id, name: user.firstName, lastName: user.lastName, email: user.email)
        try await newUser.save(on: fluent.db())
    }

}
