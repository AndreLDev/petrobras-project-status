import NavBar from '@/components/navbar';
import SearchedTable from '@/components/searchedTable';


export default function Contratacao() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-gray-200 ">
                <div className="max-w-7xl w-full bg-white p-8 rounded-md text-center">
                <h1 className="text-4xl font-bold mb-4">Buscar Contratação</h1>
                <br />
                    <div className="mx-auto">
                        <SearchedTable />
                    </div>
                </div>
            </div>
        </>
    );
}