const Spinner = ({ size = "lg", className = "" }) => {
    const sizeClasses = {
        sm: "loading-sm",
        md: "loading-md",
        lg: "loading-lg",
        xl: "loading-lg w-16"
    };

    return (
        <div className={`flex justify-center items-center py-12 ${className}`}>
            <span className={`loading loading-spinner text-primary ${sizeClasses[size]}`}></span>
        </div>
    );
};

export default Spinner;
