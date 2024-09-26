import BagelSandwichForm from '@/app/components/BagelSandwichForm'
import { bagelClient } from '@/utils/bagelClient'

export default function Home() {
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(bagelClient)));
  return (
    <main className="min-h-screen bg-gray-100">
      <BagelSandwichForm />
    </main>
  );
}