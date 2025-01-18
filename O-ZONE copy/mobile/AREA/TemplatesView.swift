import SwiftUI

struct TemplatesView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Templates")
                    .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                    .padding()
                
                TemplateCardView(title: "Google Sheets to OpenAI (ChatGPT) to Google Sheets", steps: ["doc.text.fill", "arrow.right", "brain.head.profile", "arrow.right", "doc.text.fill"])
                TemplateCardView(title: "Facebook Lead Ads to Google Sheets", steps: ["f.square.fill", "arrow.right", "doc.text.fill"])
                TemplateCardView(title: "Telegram Bot to OpenAI (ChatGPT) to Telegram Bot", steps: ["paperplane.fill", "arrow.right", "brain.head.profile", "arrow.right", "paperplane.fill"])
                TemplateCardView(title: "Twitter to Discord", steps: ["bird", "arrow.right", "bubble.left.and.bubble.right.fill"])
                TemplateCardView(title: "Discord to Google Translate to Discord", steps: ["bubble.left.and.bubble.right.fill", "arrow.right", "globe", "arrow.right", "bubble.left.and.bubble.right.fill"])
                
                Spacer()
            }
        }
    }
}

struct TemplatesView_Previews: PreviewProvider {
    static var previews: some View {
        TemplatesView()
    }
}