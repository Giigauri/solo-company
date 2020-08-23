const templates = {
 course : function(e) {
            return `<div class="col-lg-4 col-md-6 col-12" style="margin-bottom: 20px;">
                        <div class="card">
                            <img class="card-img-top img-fluid" src="/images/course_upload_img/${e.photo}">
                            <div class="card-body">
                                <h5 class="card-title">${e.header_name}</h5>
                                <p class="card-text"><span class="card-span">Description: ${e.description}</p>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="course-price-title"><span class="card-span">Price: </span> ${e.price}<span class="card-span"> $</span></p>
                                    </div>
                                    <div class="col-12">
                                        <p class="course-author-title"><span class="card-span">Author: </span> ${e.author}</p>
                                    </div>
                                </div>
                                <button class="btn btn-warning col-12" style="margin: auto">Go somewhere</button>
                            </div>
                        </div>
                </div>`

    }
}