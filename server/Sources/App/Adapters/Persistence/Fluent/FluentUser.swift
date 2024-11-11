import FluentKit
import Foundation
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

    @Field(key: "delivery_address")
    var deliveryAddress: String

    @Field(key: "preferred_time")
    var preferredTime: String

    @Field(key: "special_instructions")
    var specialInstructions: String?

    init() {}

    init(
        id: UUID? = nil, name: String, lastName: String, email: String, deliveryAddress: String, preferredTime: String,
        specialInstructions: String?
    ) {
        self.id = id
        self.firstName = name
        self.lastName = lastName
        self.email = email
        self.deliveryAddress = deliveryAddress
        self.preferredTime = preferredTime
        self.specialInstructions = specialInstructions
    }
}
