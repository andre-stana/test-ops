import SwiftUI

struct RegistrationView: View {
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var confirmPassword: String = ""
    @State private var isRegistered: Bool = false

    var body: some View {
        VStack {
            Spacer()
            
            Text("Register")
                .font(.custom("MuseoModerno", size: 34, relativeTo: .largeTitle))
                .padding()
            
            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
                .font(.custom("MuseoModerno", size: 18, relativeTo: .body))
            
            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
                .font(.custom("MuseoModerno", size: 18, relativeTo: .body))
            
            SecureField("Confirm password", text: $confirmPassword)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
                .font(.custom("MuseoModerno", size: 18, relativeTo: .body))
            
            Button(action: {
                if password == confirmPassword {
                    isRegistered = true
                }
            }) {
                Text("Register")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .font(.custom("MuseoModerno", size: 18, relativeTo: .body))
            }
            .padding()
            
            HStack {
                Button(action: {
                    // Action pour s'inscrire avec Google
                }) {
                    Image(systemName: "globe")
                        .resizable()
                        .frame(width: 30, height: 30)
                }
                .padding()
                
                Button(action: {
                    // Action pour s'inscrire avec Facebook
                }) {
                    Image(systemName: "f.square.fill")
                        .resizable()
                        .frame(width: 30, height: 30)
                }
                .padding()
                
                Button(action: {
                    // Action pour s'inscrire avec GitHub
                }) {
                    Image(systemName: "g.circle.fill")
                        .resizable()
                        .frame(width: 30, height: 30)
                }
                .padding()
            }
            
            Spacer()
        }
        .padding()
        .navigationDestination(isPresented: $isRegistered) {
            LoginView()
        }
    }
}

struct RegistrationView_Previews: PreviewProvider {
    static var previews: some View {
        RegistrationView()
    }
}