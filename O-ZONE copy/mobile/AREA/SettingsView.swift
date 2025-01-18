import SwiftUI

struct SettingsView: View {
    @State private var isLoggedOut: Bool = false
    @State private var isDarkMode: Bool = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack {
                    Text("Settings")
                        .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                        .padding()
                    
                    VStack {
                        Image(systemName: "person.crop.circle.fill")
                            .resizable()
                            .frame(width: 100, height: 100)
                            .padding()
                        
                        Text("Username")
                            .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                            .padding(.bottom, 20)
                    }
                    
                    Spacer()
                    
                    VStack(spacing: 20) {
                        NavigationLink(destination: AvailableServicesView()) {
                            Text("Link with services")
                                .font(.custom("MuseoModerno", size: 17))
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.blue)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }
                        
                        NavigationLink(destination: ChangeInformationView()) {
                            Text("Change my information")
                                .font(.custom("MuseoModerno", size: 17))
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.green)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }
                        
                        Toggle(isOn: $isDarkMode) {
                            Text("Light/Dark mode")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                        .padding()
                        .background(Color.gray.opacity(0.2))
                        .cornerRadius(10)
                        .onChange(of: isDarkMode) { oldValue, newValue in
                            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                                windowScene.windows.first?.overrideUserInterfaceStyle = newValue ? .dark : .light
                            }
                        }
                        
                        Button(action: {
                            logout()
                        }) {
                            Text("Logout")
                                .font(.custom("MuseoModerno", size: 17))
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.red)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }

                        Spacer()
                        Spacer()
                        Spacer()
                        Button(action: {
                            // Action pour supprimer le compte
                        }) {
                            Text("Delete account")
                                .font(.custom("MuseoModerno", size: 17))
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.red)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }
                        
                    }
                    .padding()
                    
                    Spacer()
                }
                .padding()
            }
            .navigationDestination(isPresented: $isLoggedOut) {
                LoginView()
            }
        }
    }
    
    func logout() {
        UserDefaults.standard.removeObject(forKey: "userToken")
        self.isLoggedOut = true
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}