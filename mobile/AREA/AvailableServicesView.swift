import SwiftUI

struct AvailableServicesView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Liste des services
                List {
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "doc.text.fill")
                            Text("Google Sheets")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "brain.head.profile")
                            Text("OpenAI (ChatGPT)")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "f.square.fill")
                            Text("Facebook Lead Ads")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "paperplane.fill")
                            Text("Telegram Bot")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "bird")
                            Text("Twitter")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "bubble.left.and.bubble.right.fill")
                            Text("Discord")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                    Button(action: {}) {
                        HStack {
                            Image(systemName: "globe")
                            Text("Google Translate")
                                .font(.custom("MuseoModerno", size: 17))
                        }
                    }
                }
                .listStyle(PlainListStyle()) // Utilisation de PlainListStyle pour retirer le fond gris
            }
            .navigationBarTitle("Available Services", displayMode: .inline)
            .font(.custom("MuseoModerno", size: 22)) // Appliquer la police MuseoModerno au titre
        }
    }
}

struct AvailableServicesView_Previews: PreviewProvider {
    static var previews: some View {
        AvailableServicesView()
    }
}