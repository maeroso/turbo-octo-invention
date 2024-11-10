import Foundation
import Hummingbird

struct UserController {
    let userService: UserService

    var endpoints: RouteCollection<AppRequestContext> {
        return RouteCollection(context: AppRequestContext.self)
            .get(":id", use: get)
            .post(use: post)
    }

    @Sendable func get(request: Request, context: some RequestContext) async throws -> User? {
        let id = try context.parameters.require("id", as: UUID.self)
        return try await userService.getUser(by: id)
    }

    @Sendable func post(request: Request, context: some RequestContext) async throws -> EditedResponse<User> {
        let createUserCommand = try await request.decode(as: CreateUserCommand.self, context: context)
        let user = try await userService.createUser(command: createUserCommand)
        return EditedResponse(status: .created, response: user)
    }
}
