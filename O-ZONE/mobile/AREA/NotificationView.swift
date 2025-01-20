import SwiftUI

struct NotificationView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Notification")
                    .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                    .padding()
                
                NotificationCardView(title: "In Progress", description: "Generate ChatGPT Completions from Google Sheets Rows", steps: ["doc.text.fill", "arrow.right", "brain.head.profile", "arrow.right", "doc.text.fill"])
                NotificationCardView(title: "In Progress", description: "Facebook Lead Ads to Google Sheets", steps: ["f.square.fill", "arrow.right", "doc.text.fill"])
                NotificationCardView(title: "In Progress", description: "Telegram Bot to OpenAI (ChatGPT) to Telegram Bot", steps: ["paperplane.fill", "arrow.right", "brain.head.profile", "arrow.right", "paperplane.fill"])
                NotificationCardView(title: "In Progress", description: "Twitter to Discord", steps: ["bird", "arrow.right", "bubble.left.and.bubble.right.fill"])
                NotificationCardView(title: "In Progress", description: "Discord to Google Translate to Discord", steps: ["bubble.left.and.bubble.right.fill", "arrow.right", "globe", "arrow.right", "bubble.left.and.bubble.right.fill"])
                
                Spacer()
            }
        }
    }
}

struct NotificationView_Previews: PreviewProvider {
    static var previews: some View {
        NotificationView()
    }
}