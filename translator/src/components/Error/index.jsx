import React from "react";

export default ({ error }) => {

    return (
        <>
            { error && (
                <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
                    {error}
                </div>
            )}
        </>
    )
}