import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const components = [
  { name: 'CORE SUBSTRATE', count: 10, status: 'active' },
  { name: 'CORE SERVICES', count: 16, status: 'active' },
  { name: 'INFRASTRUCTURE', count: 16, status: 'active' },
];

export function ArchitectureLens() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--gm-snow)]">THE ARCHITECTURE</h1>
        <div className="text-[var(--gm-silver)]">
          TOTAL COMPONENTS: 42 | HEALTHY: 42
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {components.map((component) => (
          <Card key={component.name} className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20">
            <CardHeader>
              <CardTitle className="text-[var(--gm-snow)]">{component.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--gm-violet)]">{component.count}</p>
              <p className="text-[var(--gm-silver)] text-sm uppercase">Components {component.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
