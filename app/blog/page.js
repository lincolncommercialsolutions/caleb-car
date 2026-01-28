export default function Blog() {
  const posts = [
    {
      title: "The Art of Paint Correction: Restoring Your Vehicle's True Beauty",
      excerpt: "Discover how our multi-stage paint correction process removes years of imperfections and reveals the mirror-like finish your luxury vehicle deserves. From swirl mark removal to ceramic coating application, learn why proper paint care is an investment in your vehicle's longevity.",
      date: "January 15, 2025",
      author: "Marcus Chen, Master Detailer",
      content: `Paint correction is far more than a simple wash and wax—it's a meticulous science that requires expert technique and premium products. At CalebCar, we employ a comprehensive multi-stage process that addresses everything from minor swirl marks to deep scratches.

The journey begins with a thorough decontamination wash using pH-neutral soaps and clay bar treatment to remove embedded contaminants. Next, we assess the paint condition under high-intensity lighting to identify defects invisible to the naked eye.

Our correction process uses precision polishing with graduated compounds, starting with cutting compounds for deeper defects and finishing with ultra-fine polishes for that showroom mirror finish. Each panel receives individual attention, with paint thickness measurements ensuring we never compromise the clear coat integrity.

The final stage involves ceramic coating application—a liquid polymer that chemically bonds with your vehicle's paint, creating a protective layer that repels water, dirt, and UV rays. Unlike traditional wax that lasts weeks, our ceramic coatings provide years of protection while enhancing depth and gloss.

For our discerning clients, we offer packages ranging from single-stage enhancement to our signature five-stage concierge detail. The investment in proper paint care pays dividends in resale value and the daily pride of driving a vehicle that looks better than the day it left the factory.`
    },
    {
      title: "Performance Tuning Demystified: Unlocking Your Vehicle's Hidden Potential",
      excerpt: "Modern luxury vehicles are engineering marvels, yet manufacturers often limit their true capabilities. Learn how our precision ECU tuning, exhaust upgrades, and suspension enhancements can transform your driving experience while maintaining reliability and warranty considerations.",
      date: "January 8, 2025",
      author: "Adrian Kowalski, Performance Engineer",
      content: `Every luxury performance vehicle leaves the factory with untapped potential. Manufacturers must balance global emissions standards, fuel economy requirements, and broad market appeal—often at the expense of pure performance. At CalebCar, we specialize in unlocking this hidden capability through precision engineering.

ECU tuning forms the foundation of any performance upgrade. Using proprietary software, we optimize fuel maps, boost pressure, and ignition timing to extract significant horsepower and torque gains. A typical BMW M3, for instance, can gain 50-80 HP with tuning alone—all while improving throttle response and maintaining factory reliability.

Exhaust systems represent another transformational upgrade. OEM exhausts prioritize sound compliance over flow efficiency. Our cat-back and down-pipe upgrades reduce backpressure, improve turbo spool, and deliver that visceral soundtrack enthusiasts crave. We offer everything from subtle refinement to full racing systems with electronic valves for on-demand aggression.

Suspension tuning deserves equal attention. Lowering springs, adjustable coilovers, and sway bar upgrades transform handling dynamics—reducing body roll, improving turn-in response, and enhancing high-speed stability. For track-focused builds, we integrate roll cages, racing seats, and harness bars.

The key to successful performance tuning is holistic integration. Boost more power without upgraded brakes, and you compromise safety. Add aggressive suspension without alignment expertise, and you'll destroy tires. Our comprehensive approach ensures every modification complements the whole, creating a balanced machine that excels on both canyon roads and racetracks.

Whether you seek an additional 100 HP for daily spirited driving or a full race-spec build pushing 800+ HP, CalebCar's performance engineering team has the expertise to deliver results that exceed expectations while maintaining the reliability luxury owners demand.`
    },
    {
      title: "Classic Car Restoration: Preserving Automotive Heritage with Modern Excellence",
      excerpt: "Restoring a classic vehicle to concours condition requires more than mechanical skill—it demands passion, patience, and reverence for automotive history. Explore our restoration philosophy and the painstaking process that brings legendary vehicles back to their former glory.",
      date: "December 28, 2024",
      author: "Vincent Moretti, Restoration Specialist",
      content: `Classic car restoration is where art meets engineering. At CalebCar, we approach each restoration project as a curator would a masterpiece—with meticulous research, period-correct sourcing, and uncompromising attention to authenticity.

The process begins with comprehensive documentation. We photograph and catalog every component during disassembly, creating a roadmap for the rebuild. Frames are media-blasted to bare metal, revealing rust or damage invisible under decades of paint. Engine blocks are hot-tanked and measured to factory specifications, with worn components either restored or replaced with NOS (New Old Stock) parts.

Paint restoration demands specialized expertise. We use period-correct formulations and application techniques—everything from cellulose lacquers for pre-war classics to single-stage enamels for muscle car era restorations. Color matching involves archival research and spectral analysis to ensure authenticity judges can verify.

Interiors receive equal reverence. Original leather hides are sourced from traditional tanneries using the same techniques as when the vehicle was new. Chrome work is sent to specialist platers who can replicate triple-plate processes no longer common in modern production. Even fasteners are date-code correct.

Mechanical restoration focuses on returning performance to showroom specifications. Carburetors are rebuilt to original jetting, distributors are recurved for period-appropriate timing, and brake systems are restored with proper materials and bleeding techniques.

Our restoration projects have earned Best in Show honors at Pebble Beach, Amelia Island, and Villa d'Este. Whether your classic is a numbers-matching Porsche 911, a pre-war Alfa Romeo, or an American muscle icon, CalebCar's restoration team possesses the knowledge and passion to honor its heritage while ensuring another generation can experience automotive history at its finest.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-text-primary">Automotive Insights</h1>
          <p className="text-lg sm:text-xl text-text-secondary">Expert perspectives on performance, restoration, and automotive excellence</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {posts.map((post, idx) => (
            <article key={idx} className="bg-surface border border-border rounded-xl p-8 hover:shadow-2xl transition-shadow">
              <div className="flex items-center text-sm text-text-secondary mb-3">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-text-primary hover:text-accent transition cursor-pointer">
                {post.title}
              </h2>
              <p className="text-text-secondary mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-text-secondary leading-relaxed mb-6 prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              <div className="flex items-center pt-4 border-t border-border">
                <span className="text-accent font-semibold hover:text-accent-hover transition cursor-pointer">
                  Share Article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
