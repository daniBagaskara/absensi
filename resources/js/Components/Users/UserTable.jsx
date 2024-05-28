import { Link, usePage } from "@inertiajs/react";

const UserTable = ({ users }) => {
    return (
        <div className="overflow-x-auto p-6">
            <table className="table w-full text-slate-800 border border-slate-300">
                <thead>
                    <tr className="bg-slate-200 text-lg text-slate-900 border-b border-slate-300">
                        <th className="p-4 border-r border-slate-300">ID</th>
                        <th className="p-4 border-r border-slate-300">Name</th>
                        <th className="p-4 border-r border-slate-300">Email</th>
                        <th className="p-4 border-r border-slate-300">Role</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user, index) => (
                        <tr
                            key={index}
                            className="hover:bg-slate-100 text-lg border-b border-slate-300"
                        >
                            <td className="p-4 border-r border-slate-300">
                                {user.id}
                            </td>
                            <td className="p-4 border-r border-slate-300">
                                {user.name}
                            </td>
                            <td className="p-4 border-r border-slate-300">
                                {user.email}
                            </td>
                            <td className="p-4 border-r border-slate-300">
                                {user.role}
                            </td>
                            <td className="text-center">
                                <Link
                                    href={route("user.edit", user.id)}
                                    className="font-bold py-2 px-4 rounded bg-gray-700 text-white hover:bg-gray-500"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center mt-4">
                <span>
                    Page {users.current_page} of {users.last_page}
                </span>
            </div>

            <div className="mt-5 flex justify-center">
                {users.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`font-bold py-2 px-4 rounded ${
                            link.active
                                ? "bg-slate-300 text-black"
                                : "bg-blue-500 hover:bg-blue-700 text-white"
                        } mx-1`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        disabled={!link.url || link.active}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserTable;
