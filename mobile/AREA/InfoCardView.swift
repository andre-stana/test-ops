import SwiftUI

struct InfoCardView: View {
    var title: String
    var value: String

    var body: some View {
        VStack {
            Text(title)
                .font(.custom("MuseoModerno", size: 18, relativeTo: .headline))
                .padding(.bottom, 5)
            
            Text(value)
                .font(.custom("MuseoModerno", size: 19, relativeTo: .title))
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