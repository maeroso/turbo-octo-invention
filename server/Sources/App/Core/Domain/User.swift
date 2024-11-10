import Foundation

struct User: Codable, Equatable {
    var id: UUID
    var firstName: String
    var lastName: String
    var email: String
}
