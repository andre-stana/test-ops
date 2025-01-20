import SwiftUI

struct Card: Identifiable {
    let id = UUID()
    let title: String
    var position: CGPoint
}