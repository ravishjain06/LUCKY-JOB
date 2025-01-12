import React from "react";

const testimonials = [
    {
        id: 1,
        name: "Michelle Meyer RD",
        position: "Clinical Registered Dietitian",
        feedback:
            "This platform made job hunting so easy! Within weeks, I landed my dream job thanks to the personalized recommendations and user-friendly interface.",
        image:
            "https://images.unsplash.com/photo-1599870418764-c38abcfb955a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxmYWNlfGVufDB8fDB8fHww", // Replace with a real image URL
    },
    {
        id: 2,
        name: "Sharon Palmer",
        position: "Registered Dietitian — The Plant-Powered Dietitian",
        feedback:
            "The job portal helped me connect with top companies in my industry. The process was seamless, and I felt supported every step of the way.",
        image:
            "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZhY2V8ZW58MHx8MHx8fDA%3D", // Replace with a real image URL
    },
    {
        id: 3,
        name: "Tavis Piattoly MS, RD, LDN",
        position: "Registered Dietitian",
        feedback:
            "The job portal helped me connect with top companies in my industry. The process was seamless, and I felt supported every step of the way.",
        image:
            "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGZhY2V8ZW58MHx8MHx8fDA%3D", // Replace with a real image URL
    },
];

const Testimonial = () => {
    return (
        <div className="bg-[#F5F5F5] py-16 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
                    Our Users Journey to Career Success
                </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white shadow-lg rounded-lg p-6 text-left"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    {testimonial.name}
                                </h3>
                                <p className="text-sm text-gray-500">{testimonial.position}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600">{testimonial.feedback}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
