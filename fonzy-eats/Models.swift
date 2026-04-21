import Foundation
import SwiftUI

enum City: String, CaseIterable, Identifiable, Codable {
    case nyc, rio

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .nyc: return "New York"
        case .rio: return "Rio de Janeiro"
        }
    }

    var shortName: String {
        switch self {
        case .nyc: return "NYC"
        case .rio: return "Rio"
        }
    }
}

enum CheckInStart: String, CaseIterable, Identifiable {
    case mood
    case craving

    var id: String { rawValue }

    var title: String {
        switch self {
        case .mood: return "How I'm feeling"
        case .craving: return "What I'm craving"
        }
    }

    var emoji: String {
        switch self {
        case .mood: return "🫀"
        case .craving: return "🍴"
        }
    }

    var subtitle: String {
        switch self {
        case .mood: return "Start from a vibe"
        case .craving: return "Start from a taste"
        }
    }
}

struct TaxonomyNode: Identifiable, Hashable {
    let id: String
    let label: String
    let emoji: String
    let children: [TaxonomyNode]
    /// Tags applied to restaurants; matched when this node is a leaf.
    let tags: Set<String>

    var isLeaf: Bool { children.isEmpty }

    static func == (lhs: TaxonomyNode, rhs: TaxonomyNode) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

struct Restaurant: Identifiable, Hashable {
    let id: String
    let name: String
    let city: City
    let neighborhood: String
    let cuisine: String
    /// 1-4, reflected as $-$$$$.
    let priceLevel: Int
    let signature: String
    let vibe: String
    let tags: Set<String>

    var priceString: String { String(repeating: "$", count: max(1, min(4, priceLevel))) }
}

final class Session: ObservableObject {
    @Published var city: City?
    @Published var start: CheckInStart?
    @Published var path: [TaxonomyNode] = []
    @Published var screen: Screen = .checkIn

    enum Screen: Equatable {
        case cityPicker
        case checkIn
        case mindMap
        case results
        case detail(Restaurant)
    }

    var currentNode: TaxonomyNode? { path.last }

    func chooseCity(_ city: City) {
        self.city = city
        screen = .checkIn
    }

    func begin(_ start: CheckInStart) {
        self.start = start
        let root = start == .mood ? Taxonomy.moodRoot : Taxonomy.cravingRoot
        path = [root]
        screen = .mindMap
    }

    func push(_ node: TaxonomyNode) {
        path.append(node)
        if node.isLeaf {
            screen = .results
        }
    }

    func pop() {
        guard path.count > 1 else {
            resetToCheckIn()
            return
        }
        path.removeLast()
        screen = .mindMap
    }

    func resetToCheckIn() {
        path = []
        start = nil
        screen = .checkIn
    }

    func open(_ restaurant: Restaurant) { screen = .detail(restaurant) }

    func backFromDetail() { screen = .results }

    /// Restaurants in the active city matching any tag on the current leaf.
    var matches: [Restaurant] {
        guard let leaf = currentNode, leaf.isLeaf, let city else { return [] }
        let pool = MockData.restaurants.filter { $0.city == city }
        let scored = pool
            .map { r -> (Restaurant, Int) in
                let overlap = r.tags.intersection(leaf.tags).count
                return (r, overlap)
            }
            .filter { $0.1 > 0 }
            .sorted { lhs, rhs in
                if lhs.1 != rhs.1 { return lhs.1 > rhs.1 }
                return lhs.0.name < rhs.0.name
            }
        return scored.map { $0.0 }
    }
}
