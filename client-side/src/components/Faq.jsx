const Faq = () => {
    return (<section className="bg-base-200 text-base-800">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
            <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
            <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
            <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                <div>
                    <h3 className="font-semibold">How do I borrow a book from the library?</h3>
                    <p className="mt-1text-gray-400">Borrowing a book is easy! Simply log in to your account, search for the book you want, and click on the Borrow button. The book will then be added to your account, and you can pick it up from the library at your convenience.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I renew a book if I need more time?</h3>
                    <p className="mt-1text-gray-400">Yes, you can renew your borrowed books online. Just log in to your account, navigate to your borrowed items, and select the book you want to renew. Click on the Renew button, and you will get extra time to enjoy your book!</p>
                </div>
                <div>
                    <h3 className="font-semibold">How can I return a book?</h3>
                    <p className="mt-1text-gray-400">Returning a book is simple. You can drop it off at the librarys return desk during opening hours, or use our convenient book drop located outside the library for after-hours returns. Dont forget to check the due date to avoid any late fees!</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I reserve a book thats currently checked out?</h3>
                    <p className="mt-1text-gray-400">Absolutely! If the book you want is currently checked out, you can place a hold on it. Just log in to your account, find the book in our catalog, and click on the Place Hold button. We will notify you as soon as the book becomes available for pickup.</p>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Faq;