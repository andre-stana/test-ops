import SwiftUI

struct ChangeInformationView: View {
    @State private var username: String = "Username"
    @State private var email: String = "user@example.com"
    @State private var currentPassword: String = ""
    @State private var newPassword: String = ""
    @State private var confirmPassword: String = ""
    @State private var showPasswordMismatchAlert: Bool = false

    var body: some View {
        ScrollView {
            VStack {
                Text("My Info")
                    .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                    .padding()

                VStack {
                    ZStack(alignment: .bottomTrailing) {
                        Image(systemName: "person.crop.circle.fill")
                            .resizable()
                            .frame(width: 100, height: 100)
                            .padding()
                        
                        Button(action: {
                            // Action pour changer la photo de profil
                        }) {
                            Image(systemName: "pencil.circle.fill")
                                .resizable()
                                .frame(width: 30, height: 30)
                                .background(Color.white)
                                .clipShape(Circle())
                        }
                        .offset(x: -10, y: -10)
                    }

                    TextField("Username", text: $username)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    TextField("Email", text: $email)
                        .disabled(true)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()
                        .foregroundColor(.gray)

                    SecureField("Current Password", text: $currentPassword)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    SecureField("New Password", text: $newPassword)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    SecureField("Confirm New Password", text: $confirmPassword)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    Button(action: {
                        if newPassword == confirmPassword {
                            // Action pour changer le mot de passe
                        } else {
                            showPasswordMismatchAlert = true
                        }
                    }) {
                        Text("Save")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                    .alert(isPresented: $showPasswordMismatchAlert) {
                        Alert(
                            title: Text("Password Mismatch"),
                            message: Text("The new password and confirmation do not match."),
                            dismissButton: .default(Text("OK"))
                        )
                    }
                }
                .padding()
            }
            .padding()
        }
    }
}

struct ChangeInformationView_Previews: PreviewProvider {
    static var previews: some View {
        ChangeInformationView()
    }
}