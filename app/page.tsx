import NavBar from '@/components/navbar';
import { FiBriefcase, FiSettings, FiPhone } from 'react-icons/fi';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-screen bg-green-100">
        <header className="bg-green-500 shadow-md p-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white">Bem-vindo à PSC</h1>
          </div>
        </header>
        <section className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-8">
              <img
                src="https://imagens.ebc.com.br/YDtjVOuxvS99bgBK-VzLV_Hsh8c=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/_mg_1446_0.jpg?itok=cAwV_9g3"
                alt="Imagem de destaque"
                className="rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <p className="text-xl text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus
                ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
                Quisque nonummy ipsum non arcu. Sed in libero ut nibh placerat accumsan.
              </p>
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Nossos Serviços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Serviço 1"
              description="Descrição detalhada do Serviço 1. Inclua informações importantes e destaque os benefícios para os clientes."
              icon={<FiBriefcase className="text-3xl mb-4 text-gray-800" />}
            />
            <ServiceCard
              title="Serviço 2"
              description="Descrição detalhada do Serviço 2. Destaque os recursos exclusivos e como podem ajudar os clientes."
              icon={<FiSettings className="text-3xl mb-4 text-gray-800" />}
            />
            <ServiceCard 
              title="Serviço 3"
              description="Descrição detalhada do Serviço 3. Forneça informações claras e atraentes sobre o que oferece."
              icon={<FiPhone className="text-3xl mb-4 text-gray-800" />}
            />
          </div>
        </section>
        <section className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Entre em Contato</h2>
          <p className="text-xl text-gray-700 mb-6">
            Estamos aqui para ajudar! Entre em contato conosco para obter mais informações sobre
            nossos serviços ou para esclarecer qualquer dúvida.
          </p>
          <div className="flex justify-center">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Contato
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-md shadow-md transition-transform transform hover:scale-105">
    {icon}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);
