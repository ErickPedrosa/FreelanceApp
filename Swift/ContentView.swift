import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = UserRegistrationViewModel()
    
    var body: some View {
        NavigationView {
            Form {
                userInformationSection
                vehicleInformationSection
                registerButton
            }
            .navigationBarTitle("User Registration")
            .alert(isPresented: $viewModel.showAlert) {
                Alert(title: Text("Error"), message: Text(viewModel.errorMessage ?? "Unknown error"), dismissButton: .default(Text("OK")))
            }
        }
    }


    private var userInformationSection: some View {
        Section(header: Text("User Information")) {
            createTextField("Name", text: $viewModel.name)
            createTextField("CPF", text: $viewModel.cpf)
            createTextField("Email", text: $viewModel.email)
            createTextField("Primary Phone", text: $viewModel.primaryPhone)
        }
    }


    private var vehicleInformationSection: some View {
        Section(header: Text("Vehicle Information")) {
            createTextField("Vehicle", text: $viewModel.vehicle)
        }
    }


    private func createTextField(_ title: String, text: Binding<String>) -> some View {
        TextField(title, text: text)
            .autocapitalization(.none)
            .disableAutocorrection(true)
            .onChange(of: text.wrappedValue) { newValue in
                viewModel.performSentimentAnalysis(on: newValue)
            }
            .overlay(RoundedRectangle(cornerRadius: 8)
                        .stroke(viewModel.errorFields.contains(title) ? Color.red : Color.clear, lineWidth: 1))
    }


    private var registerButton: some View {
        Button(action: {
            viewModel.registerUser()
        }) {
            Text("Register")
        }
    }
}
