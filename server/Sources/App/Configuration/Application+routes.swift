import Hummingbird
import HummingbirdFluent

typealias AppRequestContext = BasicRequestContext

func buildRouter(inMemoryTesting: Bool, fluent: Fluent) -> Router<AppRequestContext> {
    let router = Router(context: AppRequestContext.self)
    router.addMiddleware { LogRequestsMiddleware(.info) }

    let userController: UserController = buildUserController(inMemoryTesting: inMemoryTesting, fluent: fluent)
    router.addRoutes(userController.endpoints, atPath: "/users")

    router.get("/health") { _, _ -> HTTPResponse.Status in
        return .ok
    }

    return router
}

func buildUserController(inMemoryTesting: Bool, fluent: Fluent) -> UserController {
    let userRepository: UserRepository = inMemoryTesting ? InMemoryUserRepository() : FluentUserRepository(fluent: fluent)
    let userService = UserService(repository: userRepository)
    return UserController(userService: userService)
}
