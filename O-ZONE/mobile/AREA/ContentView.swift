import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            TabView {
                DashboardView()
                    .tabItem {
                        Image(systemName: "house")
                            .font(.system(size: 25))
                        Text("Dashboard")
                    }
                
                TemplatesView()
                    .tabItem {
                        Image(systemName: "heart")
                            .font(.system(size: 25))
                        Text("Templates")
                    }
                
                NewScenarioView()
                    .tabItem {
                        Image(systemName: "plus.app")
                            .font(.system(size: 95))
                        Text("New Scenario")
                    }
                
                NotificationView()
                    .tabItem {
                        Image(systemName: "message")
                            .font(.system(size: 25))
                        Text("Notification")
                    }
                
                SettingsView()
                    .tabItem {
                        Image(systemName: "person")
                            .font(.system(size: 25))
                        Text("Settings")
                    }
            }
            .background(Color(red: 254/255, green: 249/255, blue: 254/255))
            .navigationBarBackButtonHidden(true)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}