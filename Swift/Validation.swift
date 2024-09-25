import Foundation


enum ValidationError: LocalizedError {
    case emptyField(String)
    case invalidFormat(String)
    
    var errorDescription: String? {
        switch self {
        case .emptyField(let fieldName):
            return "\(fieldName) cannot be empty."
        case .invalidFormat(let fieldName):
            return "Invalid \(fieldName) format."
        }
    }
}


struct Validator {
    static func validateEmail(_ email: String) -> Bool {
        let emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        return NSPredicate(format: "SELF MATCHES %@", emailRegex).evaluate(with: email)
    }


    static func validateCPF(_ cpf: String) -> Bool {
        let cpfRegex = "^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$"
        return NSPredicate(format: "SELF MATCHES %@", cpfRegex).evaluate(with: cpf)
    }


    static func validatePhone(_ phone: String) -> Bool {
        let phoneRegex = "^[0-9]{10,11}$"
        return NSPredicate(format: "SELF MATCHES %@", phoneRegex).evaluate(with: phone)
    }
}
