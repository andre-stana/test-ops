import SwiftUI

struct NotificationCardView: View {
    var title: String
    var description: String
    var steps: [String]

    var body: some View {
        VStack {
            Text(title)
                .font(.custom("MuseoModerno", size: 18, relativeTo: .headline))
                .padding(.bottom, 5)
                .multilineTextAlignment(.center)
            
            Divider()
                .padding(.vertical, 5)
            
            Text(description)
                .font(.custom("MuseoModerno", size: 16, relativeTo: .body))
                .padding(.bottom, 10)
                .multilineTextAlignment(.center)
            
            HStack {
                Spacer()
                ForEach(steps, id: \.self) { step in
                    HStack {
                        Image(systemName: step)
                            .resizable()
                            .frame(width: 30, height: 30)
                        if step != steps.last {
                            Image(systemName: "circle.fill")
                                .resizable()
                                .frame(width: 5, height: 5)
                                .padding(.horizontal, 5)
                        }
                    }
                }
                Spacer()
            }
            .padding(.bottom, 10)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(Color(red: 200/255, green: 200/255, blue: 200/255))
                .shadow(color: Color.white.opacity(0.2), radius: 10, x: -10, y: -10)
                .shadow(color: Color.black.opacity(0.5), radius: 10, x: 10, y: 10)
        )
        .padding(.horizontal)
    }
}