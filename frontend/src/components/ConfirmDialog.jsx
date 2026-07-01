import { useState, useEffect } from "react";

function ConfirmDialog({

    open,

    title,

    message,

    placeholder = "",

    confirmText = "Confirm",

    cancelText = "Cancel",

    onConfirm,

    onCancel

}) {

    const [value, setValue] = useState("");

    useEffect(() => {

        if (open) {

            setValue("");

        }

    }, [open]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

                <div className="border-b px-8 py-6">

                    <h2 className="text-2xl font-bold">

                        {title}

                    </h2>

                </div>

                <div className="p-8">

                    {

                        message &&

                        <p className="text-slate-600 mb-5">

                            {message}

                        </p>

                    }

                    <textarea

                        rows="6"

                        className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"

                        placeholder={placeholder}

                        value={value}

                        onChange={(e)=>setValue(e.target.value)}

                    />

                </div>

                <div className="border-t px-8 py-5 flex justify-end gap-3">

                    <button

                        onClick={onCancel}

                        className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"

                    >

                        {cancelText}

                    </button>

                    <button

                        onClick={()=>onConfirm(value)}

                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDialog;