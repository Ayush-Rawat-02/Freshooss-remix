import { Line } from 'react-chartjs-2'
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ pastPrices }) {
    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Vegetable Price Graph'
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = {
        labels,
        datasets: [
            {
                label: 'Vegetable Price',
                // data: [12, 4, 9, 35, 2, 51, 3, 563, 1, 35],
                data: pastPrices,
                backgroundColor: 'skyblue',
                borderColor: 'green'
            }
        ]
    }
    return (
        <div className='bg-white w-[95vw] sm:max-lg:w-[90vw] lg:w-[60vw]'>
            <Line
                options={options}
                data={data}
            />
        </div>
    )
}

export default LineChart