import Foundation
import FluentKit
import Hummingbird

final class FluentUser: Model, @unchecked Sendable {
    static let schema = "users"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "first_name")
    var firstName: String

    @Field(key: "last_name")
    var lastName: String

    @Field(key: "email")
    var email: String

    init() {}

    init(id: UUID? = nil, name: String, lastName: String, email: String) {
        self.id = id
        self.firstName = name
        self.lastName = lastName
        self.email = email
    }
}
