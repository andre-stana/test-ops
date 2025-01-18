import SwiftUI

struct DashboardView: View {
    var body: some View {
        VStack {
            Text("Dashboard")
                .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                //.padding()
            
            Spacer()
            
            InfoCardView(title: "Last scenario used", value: "Scenario 4")
            InfoCardView(title: "Number of scenarios in use", value: "42")
            InfoCardView(title: "Number of scenarios finished", value: "10")
            InfoCardView(title: "Number of scenarios created", value: "50")
            
            Spacer()
        }
        .padding()
        //.background(Color(red: 254/255, green: 249/255, blue: 254/255))
    }
}

struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView()
    }
}
