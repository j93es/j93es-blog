import "pages/header/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-wrapper">
      <Link to="/" className="header-title">
        <svg
          // xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="100"
          viewBox="0 0 1080 1080"
          version="1.1"
        >
          <path d="" stroke="none" fill="#080404" fill-rule="evenodd" />
          <path
            d="M 119.733 513.750 C 119.307 621.991, 119.373 620.586, 114.146 632.402 C 111.352 638.719, 104.825 645.380, 98.727 648.137 C 94.296 650.140, 91.898 650.500, 82.978 650.500 C 73.048 650.500, 72.070 650.310, 65.604 647.127 C 57.747 643.258, 49.054 635.053, 44.500 627.208 C 42.850 624.365, 41.139 622.031, 40.698 622.020 C 40.125 622.006, 4.428 647.769, 1.165 650.551 C 0.980 650.709, 3.196 654.361, 6.088 658.669 C 28.250 691.676, 64.274 705.783, 108.846 698.910 C 140.670 694.002, 165.020 670.520, 173.551 636.511 C 177.456 620.943, 177.969 605.797, 177.985 505.750 L 178 413 149.064 413 L 120.129 413 119.733 513.750 M 652.500 509.026 C 637.155 510.679, 625.193 516.627, 613.408 528.465 C 606.981 534.922, 604.362 538.499, 600.682 545.851 C 598.133 550.942, 595.516 556.883, 594.866 559.053 C 593.429 563.850, 592.548 564.011, 591.063 559.750 C 586.426 546.445, 572.130 530.691, 558.898 524.304 C 548.272 519.175, 541.186 517.675, 528 517.762 C 492.388 517.999, 468.534 538.588, 458.879 577.422 C 456.012 588.956, 455.231 613.419, 457.344 625.516 C 461.076 646.881, 471.780 668.860, 487.273 686.967 C 489.707 689.811, 490.256 690.042, 491.773 688.854 C 498.390 683.672, 522.992 662.822, 523.544 661.929 C 523.918 661.323, 522.889 659.404, 521.255 657.664 C 507.405 642.909, 499.130 622.815, 500.242 606.641 C 501.783 584.236, 514.023 573.102, 535.902 574.202 C 546.124 574.716, 551.815 576.945, 558.396 583.011 C 568.248 592.092, 572.629 605.190, 574.540 631.270 L 575.183 640.041 595.341 639.770 L 615.500 639.500 616.176 626 C 617.472 600.132, 622.734 583.325, 632.397 574.186 C 639.642 567.333, 645.051 565.500, 658.021 565.500 C 667.884 565.500, 668.958 565.705, 675.185 568.771 C 678.839 570.569, 683.290 573.706, 685.077 575.740 C 688.990 580.197, 693.347 589.558, 694.879 596.799 C 697.569 609.513, 695.354 628.303, 689.669 641 C 686.425 648.245, 678.480 660.216, 672.612 666.699 L 667.907 671.898 673.703 676.451 C 676.892 678.956, 684.781 684.867, 691.236 689.586 L 702.972 698.167 705.736 696.029 C 712.936 690.460, 724.048 675.382, 730.202 662.829 C 742.869 636.994, 745.762 597.103, 737.021 568.804 C 728.285 540.518, 708.745 519.194, 685 512.032 C 679.683 510.428, 661.892 507.661, 660 508.144 C 659.725 508.214, 656.350 508.611, 652.500 509.026 M 834 511.990 C 804.942 516.640, 779.883 537.073, 768.606 565.313 C 762.561 580.452, 761.634 585.925, 761.630 606.500 C 761.627 623.865, 761.852 626.336, 764.245 635.208 C 772.883 667.233, 794.773 689.431, 825.936 697.768 C 834.109 699.955, 837.609 700.327, 850 700.329 C 864.969 700.332, 872.380 699.204, 885.225 694.969 C 892.090 692.705, 908.214 684.929, 911.680 682.210 L 913.860 680.500 905.724 665.922 L 897.589 651.345 889.341 655.553 C 878.252 661.212, 868.868 663.488, 857 663.398 C 842.232 663.285, 832.533 659.881, 823.284 651.565 C 815.948 644.970, 810.226 634.375, 808.536 624.259 L 807.827 620.017 863.147 619.759 L 918.466 619.500 919.229 615.500 C 920.671 607.939, 920.255 584.714, 918.510 575.403 C 911.108 535.898, 886.488 513.261, 849.061 511.548 C 843.803 511.307, 837.025 511.506, 834 511.990 M 999.539 512.112 C 971.716 516.166, 951.708 533.058, 946.965 556.500 C 944.652 567.934, 947.269 582.034, 953.367 590.988 C 961.453 602.861, 972.469 610.143, 998.253 620.657 C 1017.690 628.584, 1022.639 631.132, 1027.679 635.808 C 1035.441 643.010, 1033.441 656.221, 1023.834 661.207 C 1009.937 668.418, 988.415 664.536, 967.723 651.086 L 958.668 645.200 947.756 660.201 L 936.843 675.202 939.078 676.851 C 967.761 698.019, 999.812 705.419, 1030.726 698.013 C 1059.856 691.034, 1078 670.588, 1078 644.742 C 1078 617.132, 1063.622 602.196, 1022.494 587.084 C 996.970 577.706, 991.487 573.301, 992.224 562.764 C 992.830 554.101, 997.670 549.763, 1008.734 547.962 C 1021.131 545.944, 1034.047 550.015, 1051.112 561.319 L 1053.725 563.050 1064.362 548.618 C 1070.213 540.680, 1075 533.962, 1075 533.689 C 1075 532.726, 1058.632 522.708, 1052.605 519.982 C 1036.110 512.522, 1016.594 509.628, 999.539 512.112 M 277.500 513.170 C 249.663 515.826, 224.544 531.138, 208.881 555 C 203.987 562.454, 202.640 565.244, 199.704 574 C 195.726 585.866, 194.663 591.788, 194.592 602.500 C 194.454 623.224, 198.852 638.893, 209.423 655.340 C 214.003 662.466, 225.463 674.685, 231.244 678.607 C 233.585 680.195, 235.725 681.777, 236 682.124 C 237.380 683.860, 253.363 691.297, 259.500 693.058 C 270.230 696.138, 273.405 696.506, 288.500 696.423 C 303.596 696.340, 309.177 695.285, 321.874 690.118 C 337.648 683.699, 353.351 671.143, 362.492 657.642 C 367.325 650.502, 374.045 636.260, 375.993 629.027 C 377.114 624.864, 377.134 624.849, 378.921 626.909 C 379.911 628.050, 387.908 636.525, 396.693 645.742 C 405.479 654.959, 414.250 664.300, 416.186 666.500 C 421.356 672.376, 427.734 682.091, 428.546 685.326 C 429.022 687.225, 429.584 687.816, 430.264 687.136 C 430.819 686.581, 434.812 678.168, 439.137 668.442 C 448.364 647.690, 448.785 644.826, 443.992 635.410 C 441.508 630.531, 432.654 621.113, 393.242 581.425 C 366.984 554.983, 344.375 532.483, 343 531.425 C 334.278 524.712, 319.403 517.485, 310 515.392 C 308.075 514.963, 306.275 514.554, 306 514.482 C 299.297 512.722, 287.756 512.191, 277.500 513.170 M 834.500 550.336 C 832.300 551.059, 829.403 552.241, 828.062 552.961 C 823.218 555.565, 815.732 563.588, 812.885 569.227 C 810.417 574.116, 807 584.558, 807 587.210 C 807 587.645, 823.265 588, 843.145 588 L 879.290 588 878.724 581.249 C 877.590 567.719, 871.204 556.965, 861.377 552.035 C 855.483 549.078, 841.094 548.168, 834.500 550.336 M 276.461 555.460 C 268.657 556.911, 264.775 558.514, 257.880 563.133 C 232.394 580.208, 229.408 615.606, 251.609 637.481 C 259.321 645.079, 259.337 645.091, 266.513 648.383 C 275.171 652.355, 283.162 653.965, 291.922 653.503 C 314.850 652.294, 334.083 636.104, 337.997 614.717 C 344.397 579.754, 312.260 548.807, 276.461 555.460"
            stroke="none"
            fill="#040404"
            fill-rule="evenodd"
          />
        </svg>
      </Link>
    </header>
  );
}

export default Header;
