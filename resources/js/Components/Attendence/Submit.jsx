import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SelectBox from "@/Components/SelectBox";
import { useState, useEffect } from "react";

export default function Submit() {
    const [transitioning, setTranstioning] = useState(false);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            status: "attend",
            description: "",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("attendance.submit"), {
            preserveScroll: true,
            onSuccess: () => {
                setData({ status: "attend", description: "" });
                alert("Berhasil mengabsen");
            },
        });
    };

    useEffect(() => {
        if (data.status == "attend") {
            setTranstioning(false);
        } else {
            setTranstioning(true);
        }
    }, [data.status]);

    return (
        <section className="max-w-xl p-6">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="status" value="status" />

                    <SelectBox
                        className="mt-1 block w-full"
                        onChange={(e) => setData("status", e.target.value)}
                        options={[
                            { value: "attend", label: "Hadir" },
                            { value: "sick", label: "Sakit" },
                            { value: "leave", label: "Cuti" },
                            { value: "permit", label: "Izin" },
                            {
                                value: "business_trip",
                                label: "Perjalanan Bisnis",
                            },
                            {
                                value: "remote_work",
                                label: "Kerja Remote",
                            },
                        ]}
                        currentValue={data.status}
                    />

                    <InputError className="mt-2" message={errors.status} />
                </div>

                <Transition
                    show={transitioning}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div>
                        <InputLabel htmlFor="description" value="Penjelasan" />

                        <TextInput
                            id="description"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                </Transition>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Submit</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Submit</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
