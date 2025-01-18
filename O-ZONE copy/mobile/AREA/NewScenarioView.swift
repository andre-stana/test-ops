import SwiftUI

struct NewScenarioView: View {
    @State private var scale: CGFloat = 1.0
    @State private var showPlayAlert = false
    @State private var showSaveAlert = false
    @State private var showSettingsMenu = false
    @State private var showLinkedServices = false
    @State private var navigateToAvailableServices = false
    @State private var cards: [Card] = []
    @State private var selectedCards: [UUID] = []
    @State private var showDeleteAlert = false
    @State private var cardToDelete: Card?
    @State private var isDeleteMode = false
    @State private var scenarioTitle: String = ""
    @State private var scenarioDescription: String = ""
    @State private var showSaveScenarioSheet = false

    var body: some View {
        NavigationView {
            GeometryReader { geometry in
                ZStack {
                    VStack(spacing: 0) {
                        Color(UIColor.systemBackground)
                            .frame(height: geometry.safeAreaInsets.top)
                            .edgesIgnoringSafeArea(.top)
                        
                        Spacer()
                        
                        Color(UIColor.systemBackground)
                            .frame(height: geometry.safeAreaInsets.bottom)
                            .edgesIgnoringSafeArea(.bottom)
                    }
                    
                    VStack(spacing: 0) {
                        Text("New Scenario")
                            .font(.custom("MuseoModerno", size: 22, relativeTo: .title))
                            .padding()
                            .background(Color(UIColor.systemBackground))
                        
                        HStack {
                            Button(action: {
                                showPlayAlert = true
                            }) {
                                Image(systemName: "play.circle.fill")
                                    .resizable()
                                    .frame(width: 40, height: 40)
                                    .padding()
                            }
                            .alert(isPresented: $showPlayAlert) {
                                Alert(
                                    title: Text("Launch Scenario"),
                                    message: Text("Are you sure you want to launch the scenario?"),
                                    primaryButton: .default(Text("Yes")) {
                                    },
                                    secondaryButton: .cancel(Text("No"))
                                )
                            }
                            
                            Spacer()
                            
                            Button(action: {
                                showSaveScenarioSheet = true
                            }) {
                                Image(systemName: "square.and.arrow.down.fill")
                                    .resizable()
                                    .frame(width: 40, height: 40)
                                    .padding()
                            }
                        }
                        .background(Color(UIColor.systemBackground))
                        .sheet(isPresented: $showSaveScenarioSheet) {
                            SaveScenarioForm(
                                title: $scenarioTitle,
                                description: $scenarioDescription,
                                onSave: {
                                    saveScenario()
                                    showSaveScenarioSheet = false
                                },
                                onCancel: {
                                    showSaveScenarioSheet = false
                                }
                            )
                        }
                        
                        ScrollView([.horizontal, .vertical], showsIndicators: false) {
                            ZStack {
                                VStack {
                                    Spacer(minLength: 100)
                                    
                                    VStack {
                                        // Ajoutez ici les éléments du tableau blanc
                                    }
                                    .scaleEffect(scale)
                                    .gesture(MagnificationGesture()
                                        .onChanged { value in
                                            scale = value.magnitude
                                        }
                                    )
                                    
                                    Spacer(minLength: 100)
                                }
                                .background(
                                    GeometryReader { geo in
                                        Path { path in
                                            let spacing: CGFloat = 20
                                            for x in stride(from: 0, to: geo.size.width, by: spacing) {
                                                for y in stride(from: 0, to: geo.size.height, by: spacing) {
                                                    path.addEllipse(in: CGRect(x: x, y: y, width: 4, height: 4))
                                                }
                                            }
                                        }
                                        .fill(Color(UIColor.label).opacity(0.5))
                                    }
                                )
                                
                                // Afficher les cartes
                                ForEach(cards) { card in
                                    CardView(card: card, selectedCards: $selectedCards, onDelete: {
                                        cardToDelete = card
                                        showDeleteAlert = true
                                    }, isDeleteMode: $isDeleteMode)
                                    .position(card.position)
                                    .gesture(
                                        DragGesture()
                                            .onChanged { value in
                                                if let index = cards.firstIndex(where: { $0.id == card.id }) {
                                                    cards[index].position = value.location
                                                }
                                            }
                                    )
                                }
                                
                                // Lignes entre les cartes sélectionnées
                                if selectedCards.count > 1 {
                                    ForEach(0..<selectedCards.count - 1, id: \.self) { index in
                                        let firstCard = cards.first { $0.id == selectedCards[index] }
                                        let secondCard = cards.first { $0.id == selectedCards[index + 1] }
                                        if let firstCard = firstCard, let secondCard = secondCard {
                                            ArrowShape(from: firstCard.position, to: secondCard.position)
                                                .stroke(Color.blue, style: StrokeStyle(lineWidth: 2, dash: [5]))
                                        }
                                    }
                                }
                            }
                            .onTapGesture {
                                isDeleteMode = false
                            }
                        }
                    }
                    
                    // Bouton Settings en bas à droite
                    VStack {
                        Spacer()
                        HStack {
                            Spacer()
                            Button(action: {
                                showSettingsMenu.toggle()
                            }) {
                                Image(systemName: "gearshape.fill")
                                    .resizable()
                                    .frame(width: 40, height: 40)
                                    .padding()
                            }
                        }
                    }
                    .frame(width: geometry.size.width, height: geometry.size.height)
                    
                    // Side menu pour les réglages
                    if showSettingsMenu {
                        Color.black.opacity(0.4)
                            .edgesIgnoringSafeArea(.all)
                            .onTapGesture {
                                showSettingsMenu = false
                                showLinkedServices = false
                                isDeleteMode = false
                            }
                        
                        VStack {
                            Spacer()
                            HStack {
                                Spacer()
                                VStack {
                                    Button(action: {
                                        showLinkedServices = true
                                    }) {
                                        Image(systemName: "plus.circle.fill")
                                            .resizable()
                                            .frame(width: 40, height: 40)
                                            .padding()
                                    }
                                    
                                    Button(action: {
                                        isDeleteMode.toggle()
                                        showSettingsMenu = false
                                    }) {
                                        Image(systemName: "trash.circle.fill")
                                            .resizable()
                                            .frame(width: 40, height: 40)
                                            .padding()
                                    }
                                }
                                .background(Color(UIColor.systemBackground))
                                .cornerRadius(10)
                                .shadow(radius: 5)
                                .padding()
                            }
                        }
                        .frame(width: geometry.size.width, height: geometry.size.height)
                    }
                    
                    // Pseudo-fenêtre/liste de services liés
                    if showLinkedServices {
                        VStack {
                            HStack {
                                Spacer()
                                Button(action: {
                                    showLinkedServices = false
                                    showSettingsMenu = false
                                }) {
                                    Image(systemName: "plus")
                                        .resizable()
                                        .frame(width: 30, height: 30)
                                        .padding()
                                }
                            }
                            .padding()
                            
                            List {
                                Button(action: {
                                    addCard(title: "Google Sheets")
                                }) {
                                    HStack {
                                        Image(systemName: "doc.text.fill")
                                        Text("Google Sheets")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "OpenAI (ChatGPT)")
                                }) {
                                    HStack {
                                        Image(systemName: "brain.head.profile")
                                        Text("OpenAI (ChatGPT)")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "Facebook Lead Ads")
                                }) {
                                    HStack {
                                        Image(systemName: "f.square.fill")
                                        Text("Facebook Lead Ads")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "Telegram Bot")
                                }) {
                                    HStack {
                                        Image(systemName: "paperplane.fill")
                                        Text("Telegram Bot")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "Twitter")
                                }) {
                                    HStack {
                                        Image(systemName: "bird")
                                        Text("Twitter")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "Discord")
                                }) {
                                    HStack {
                                        Image(systemName: "bubble.left.and.bubble.right.fill")
                                        Text("Discord")
                                    }
                                }
                                Button(action: {
                                    addCard(title: "Google Translate")
                                }) {
                                    HStack {
                                        Image(systemName: "globe")
                                        Text("Google Translate")
                                    }
                                }
                            }
                            .background(Color(UIColor.systemBackground))
                            .cornerRadius(10)
                            .shadow(radius: 5)
                            .padding()
                        }
                        .frame(width: geometry.size.width * 0.8, height: geometry.size.height * 0.6)
                        .background(Color(UIColor.systemBackground))
                        .cornerRadius(10)
                        .shadow(radius: 5)
                        .padding()
                    }
                }
            }
        }
        .alert(isPresented: $showDeleteAlert) {
            Alert(
                title: Text("Delete Card"),
                message: Text("Are you sure you want to delete this card?"),
                primaryButton: .destructive(Text("Delete")) {
                    if let cardToDelete = cardToDelete {
                        cards.removeAll { $0.id == cardToDelete.id }
                        if cards.isEmpty {
                            isDeleteMode = false
                        }
                    }
                },
                secondaryButton: .cancel()
            )
        }
    }
    
    private func saveScenario() {
        // Logique pour sauvegarder le scénario avec le titre et la description
        print("Scenario saved with title: \(scenarioTitle) and description: \(scenarioDescription)")
    }
    
    private func addCard(title: String) {
        let newCard = Card(title: title, position: CGPoint(x: 200, y: 200))
        cards.append(newCard)
        showLinkedServices = false
        showSettingsMenu = false
    }
}

struct ArrowShape: Shape {
    var from: CGPoint
    var to: CGPoint

    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: from)
        path.addLine(to: to)

        let angle = atan2(to.y - from.y, to.x - from.x)
        let arrowLength: CGFloat = 10
        let arrowAngle: CGFloat = .pi / 6

        let arrowPoint1 = CGPoint(
            x: to.x - arrowLength * cos(angle - arrowAngle),
            y: to.y - arrowLength * sin(angle - arrowAngle)
        )
        let arrowPoint2 = CGPoint(
            x: to.x - arrowLength * cos(angle + arrowAngle),
            y: to.y - arrowLength * sin(angle + arrowAngle)
        )

        path.move(to: to)
        path.addLine(to: arrowPoint1)
        path.move(to: to)
        path.addLine(to: arrowPoint2)

        return path
    }
}

struct NewScenarioView_Previews: PreviewProvider {
    static var previews: some View {
        NewScenarioView()
    }
}