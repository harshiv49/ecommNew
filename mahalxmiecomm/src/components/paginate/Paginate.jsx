import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ page, pages, keyword = "", isAdmin = false }) => {
  if (keyword) {
    //split the length of the text into two parts and take either the zeroth element or the last element
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }
  return (
    pages > 1 && (
      <Pagination>
        {/* the ...Array method takes pages number and converts it into an array andd .keys() adds the value in the array */}
        {[...Array(pages).keys()].map((x) => {
          return (
            //map through the element give a link to each elements which would be eequal to the number of pages

            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? {
                      pathname: "/",
                      search: `/?keyword=${keyword}&page=${x + 1}`,
                    }
                  : {
                      pathname: "/",
                      search: `admin/productList/?keyword=${keyword}&page=${
                        x + 1
                      }`,
                    }
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};
export default Paginate;
