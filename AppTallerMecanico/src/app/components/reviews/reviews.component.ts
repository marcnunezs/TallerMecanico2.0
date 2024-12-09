import { Component, OnInit, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface Review {
  id?: number;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
    @Input() productId!: string; 
    reviews: any[] = [];
  newReview: Review = { productId: '', userName: '', rating: 0, comment: '' };

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.loadReviews();
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
  

  loadReviews() {
    this.reviewsService.getReviews().subscribe((data) => {
      this.reviews = data.filter((review) => review.productId === this.productId);
    });
  }

  addReview() {
    this.newReview.productId = this.productId;
    this.reviewsService.addReview(this.newReview).subscribe(() => {
      this.loadReviews();
      this.newReview = { productId: '', userName: '', rating: 0, comment: '' }; 
    });
  }
}
