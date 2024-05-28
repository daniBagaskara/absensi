import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import UserTable from "@/Components/Users/UserTable";

export default function UserIndex({ auth, userList }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-3">
                        <label className="font-bold">
                            User : {userList.total}
                        </label>
                        <Link
                            href={route("user.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Create User
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <UserTable users={userList} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
