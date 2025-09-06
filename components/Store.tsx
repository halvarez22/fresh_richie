
import React from 'react';

const storeItems = [
    { 
      name: 'Digital Music', 
      description: 'High-quality downloads of all my releases.', 
      link: '#', 
      platform: 'Bandcamp', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para música digital
      imageUrl: '/543655285_1287222942404356_716693066235284799_n.jpg'
    },
    { 
      name: 'Vinyl & CDs', 
      description: 'Physical copies for your collection.', 
      link: '#', 
      platform: 'My Store', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para vinilos y CDs
      imageUrl: '/524200705_1545546396814758_7884327807306567601_n.jpg'
    },
    { 
      name: 'Apparel & Merch', 
      description: 'T-shirts, hoodies, and more.', 
      link: '#', 
      platform: 'Shopify', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para merchandising
      imageUrl: '/531422697_18399302527116843_906622902907828631_n.jpg'
    },
]

const Store: React.FC = () => {
  return (
    <section id="store" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Store</h2>
          <p className="text-lg text-slate-400 mt-2">Support directly by grabbing some music or merch.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeItems.map((item, index) => (
                <a 
                  href={item.link}
                  key={item.name} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg flex flex-col group animate-fade-in-up transform transition-transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                    <div className="overflow-hidden relative">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <span className="absolute top-4 right-4 bg-emerald-500 text-slate-900 text-xs font-bold py-1 px-3 rounded-full">{item.platform}</span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                        <p className="text-slate-300 mb-4">{item.description}</p>
                        <span className="font-semibold text-emerald-400">Shop Now &rarr;</span>
                    </div>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Store;
