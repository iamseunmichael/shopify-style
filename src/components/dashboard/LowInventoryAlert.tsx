interface Product {
    id: string
    name: string
    inventory: number
}

export default function LowInventoryAlert({items}: {items: Product[]}) {
    if(!items.length) return null

    return (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
            <h2 className="font-semibold text-red-700 mb-2">
                Low Inventory Alert
            </h2>
            <ul className="space-y-2">
                {items.map(item => (
                    <li key={item.id} className="text-sm text-red-600">
                        {item.name} - {item.inventory} left
                    </li>
                ))}
            </ul>
        </div>
    )
}