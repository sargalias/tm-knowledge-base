$(document).foundation()

const deleteArticleBtn = document.getElementById('js-delete-article');
if (deleteArticleBtn) {
    deleteArticleBtn.addEventListener('click', deleteArticle);
}

function deleteArticle(e) {
    // Create ajax delete request to URL with article.id
    // Get the article._id from e.target data attribute.
    // Redirect to data-redirect attribute value
    const xhr = new XMLHttpRequest();
    const articleId = e.target.getAttribute('data-article-id');
    const redirectTarget = e.target.getAttribute('data-redirect');
    xhr.onload = function(e) {
        if (this.status === 200) {
            window.location.replace(redirectTarget);
        }
        else {
            alert(`${this.status} - ${this.responseText}`);
        }
    };
    xhr.open('DELETE', `/articles/${articleId}`);
    xhr.send();
}