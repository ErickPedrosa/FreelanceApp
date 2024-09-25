import CoreData
    
class CoreDataManager {
    static let shared = CoreDataManager()
    let container: NSPersistentContainer
    
    private init() {
        container = NSPersistentContainer(name: "UserModel")
        container.loadPersistentStores { (description, error) in
            if let error = error {
                fatalError("Error loading Core Data. \(error)")
            }
        }
    }
    
    func saveUser(user: User) throws {
        let context = container.viewContext
        context.insert(user)
        try context.save()
    }
    
    func fetchUsers() -> [User] {
        let request = NSFetchRequest<User>(entityName: "User")
        return (try? container.viewContext.fetch(request)) ?? []
    }
}
