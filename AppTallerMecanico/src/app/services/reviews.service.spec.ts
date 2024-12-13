import { TestBed } from '@angular/core/testing';
import { ReviewsService } from './reviews.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'http://localhost:3000/reviews';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewsService]
    });

    service = TestBed.inject(ReviewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch reviews using GET', () => {
    const mockReviews = [
      { id: 1, productId: '101', userName: 'John Doe', rating: 5, comment: 'Great product!' },
      { id: 2, productId: '102', userName: 'Jane Doe', rating: 4, comment: 'Good value.' }
    ];

    service.getReviews().subscribe((reviews) => {
      expect(reviews).toEqual(mockReviews);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockReviews); // Simula la respuesta HTTP
  });

  it('should add a review using POST', () => {
    const newReview = { productId: '101', userName: 'John Smith', rating: 5, comment: 'Excellent!' };
    const mockResponse = { id: 3, ...newReview };

    service.addReview(newReview).subscribe((review) => {
      expect(review).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newReview);
    req.flush(mockResponse); // Simula la respuesta HTTP
  });
});
