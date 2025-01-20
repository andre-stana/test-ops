import SwiftUI

struct SaveScenarioView: View {
    @Binding var title: String
    @Binding var description: String

    var body: some View {
        VStack {
            TextField("Title", text: $title)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            TextField("Description", text: $description)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
        }
    }
}