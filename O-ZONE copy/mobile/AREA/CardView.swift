import SwiftUI

struct CardView: View {
    var card: Card
    @Binding var selectedCards: [UUID]
    var onDelete: () -> Void
    @Binding var isDeleteMode: Bool
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack {
            ZStack(alignment: .topLeading) {
                Text(card.title)
                    .font(.custom("MuseoModerno", size: 17))
                    .padding()
                    .background(Color(UIColor.systemBackground))
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(selectedCards.contains(card.id) ? Color.blue : Color.clear, lineWidth: 3)
                    )
                    .shadow(color: colorScheme == .dark ? Color.white.opacity(0.2) : Color.black.opacity(0.2), radius: 5, x: 0, y: 2)
                    .onTapGesture {
                        if selectedCards.contains(card.id) {
                            selectedCards.removeAll { $0 == card.id }
                        } else {
                            selectedCards.append(card.id)
                        }
                    }
                    .contextMenu {
                        Button(action: onDelete) {
                            Text("Delete")
                            Image(systemName: "trash")
                        }
                    }
                
                if isDeleteMode {
                    Button(action: onDelete) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.red)
                            .background(Color(UIColor.systemBackground))
                            .clipShape(Circle())
                    }
                    .offset(x: -10, y: -10)
                    .zIndex(1)
                }
            }
        }
    }
}

struct CardView_Previews: PreviewProvider {
    static var previews: some View {
        CardView(card: Card(title: "Sample Card", position: CGPoint(x: 100, y: 100)), selectedCards: .constant([]), onDelete: {}, isDeleteMode: .constant(false))
    }
}