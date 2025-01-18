import SwiftUI

struct LoginView: View {
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var isLoggedIn: Bool = false
    @State private var showRegistration: Bool = false

    var body: some View {
        NavigationStack {
            VStack {
                Spacer()
                
                Image("zonelol")
                    .resizable()
                    .frame(width: 100, height: 100)
                    .padding()
                
                Text("O-ZONE")
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
                
                Button(action: {
                    isLoggedIn = true
                }) {
                    Text("Login")
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
                        // Action pour se connecter avec Google
                    }) {
                        Image(systemName: "globe")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    .padding()
                    
                    Button(action: {
                        // Action pour se connecter avec Facebook
                    }) {
                        Image(systemName: "f.square.fill")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    .padding()
                    
                    Button(action: {
                        // Action pour se connecter avec GitHub
                    }) {
                        Image(systemName: "g.circle.fill")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    .padding()
                }
                
                Button(action: {
                    showRegistration = true
                }) {
                    Text("Register for free")
                        .foregroundColor(.blue)
                        .font(.custom("MuseoModerno", size: 18, relativeTo: .body))
                }
                .padding()
                
                Spacer()
            }
            .padding()
            .navigationBarBackButtonHidden(true)
            .navigationDestination(isPresented: $isLoggedIn) {
                ContentView()
            }
            .navigationDestination(isPresented: $showRegistration) {
                RegistrationView()
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}